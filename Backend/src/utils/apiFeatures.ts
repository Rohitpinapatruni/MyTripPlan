import { Query } from "mongoose";

interface QueryString {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  page?: string;
  limit?: string;
}

export class ApiFeatures {
  query: Query<any, any>;
  queryString: QueryString;

  constructor(query: Query<any, any>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $text: { $search: this.queryString.search },
      });
    }
    return this;
  }

  filter() {
    const filterObj: any = {};

    if (this.queryString.minPrice || this.queryString.maxPrice) {
      filterObj.pricePerNight = {};
      if (this.queryString.minPrice)
        filterObj.pricePerNight.$gte = Number(this.queryString.minPrice);
      if (this.queryString.maxPrice)
        filterObj.pricePerNight.$lte = Number(this.queryString.maxPrice);
    }

    if (this.queryString.rating) {
      filterObj.rating = { $gte: Number(this.queryString.rating) };
    }

    this.query = this.query.find(filterObj);
    return this;
  }

  paginate() {
    const page  = Number(this.queryString.page)  || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip  = (page - 1) * limit;
    this.query  = this.query.skip(skip).limit(limit);
    return this;
  }
}