import mongoose from "mongoose";
import dotenv   from "dotenv";
import Hotel    from "./models/Hotel";
import User     from "./models/User";

dotenv.config();

const hotels = [
  {
    name:        "The Grand Palace Mumbai",
    location:    "Mumbai, Maharashtra",
    description: "A luxurious 5-star hotel in the heart of Mumbai offering stunning sea views, world-class dining, and impeccable service.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    ],
    amenities:      ["WiFi", "Pool", "Gym", "Parking", "Restaurant", "Breakfast"],
    pricePerNight:  8500,
    totalRooms:     120,
    rating:         4.8,
  },
  {
    name:        "Taj Coastal Resort Goa",
    location:    "Goa",
    description: "A beachfront resort nestled along the pristine shores of Goa. Enjoy breathtaking sunsets, water sports, and authentic Goan cuisine.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
    ],
    amenities:     ["WiFi", "Pool", "Parking", "Restaurant", "Breakfast"],
    pricePerNight: 6200,
    totalRooms:    85,
    rating:        4.6,
  },
  {
    name:        "The Oberoi New Delhi",
    location:    "New Delhi",
    description: "An iconic luxury hotel in the capital city offering elegant rooms, fine dining, and a serene spa near major business districts.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    amenities:     ["WiFi", "Pool", "Gym", "Parking", "Restaurant"],
    pricePerNight: 12000,
    totalRooms:    200,
    rating:        4.9,
  },
  {
    name:        "Heritage Haveli Jaipur",
    location:    "Jaipur, Rajasthan",
    description: "Experience royal Rajasthani hospitality in this beautifully restored heritage haveli with cultural performances and local cuisine.",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    amenities:     ["WiFi", "Pool", "Parking", "Restaurant", "Breakfast"],
    pricePerNight: 4500,
    totalRooms:    45,
    rating:        4.5,
  },
  {
    name:        "Skyline Business Hotel Bangalore",
    location:    "Bangalore, Karnataka",
    description: "A modern business hotel in Bangalore's tech hub with high-speed WiFi, conference facilities, and comfortable rooms.",
    images: [
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=800",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
    ],
    amenities:     ["WiFi", "Gym", "Parking", "Restaurant"],
    pricePerNight: 3800,
    totalRooms:    150,
    rating:        4.2,
  },
  {
    name:        "Backwaters Retreat Kerala",
    location:    "Alleppey, Kerala",
    description: "A tranquil retreat overlooking the Kerala backwaters with houseboat rides, Ayurvedic spa treatments, and fresh seafood.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    ],
    amenities:     ["WiFi", "Pool", "Breakfast", "Restaurant"],
    pricePerNight: 5500,
    totalRooms:    30,
    rating:        4.7,
  },
  {
    name:        "Snow Peak Resort Shimla",
    location:    "Shimla, Himachal Pradesh",
    description: "A charming mountain resort with panoramic Himalayan views, cozy rooms, fireplace lounges, and trekking packages.",
    images: [
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    amenities:     ["WiFi", "Parking", "Restaurant", "Breakfast"],
    pricePerNight: 3200,
    totalRooms:    40,
    rating:        4.3,
  },
  {
    name:        "Marina Bay Hotel Chennai",
    location:    "Chennai, Tamil Nadu",
    description: "A comfortable seaside hotel near Marina Beach with spacious rooms, South Indian cuisine, and easy access to cultural landmarks.",
    images: [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800",
      "https://images.unsplash.com/photo-1533395427226-788cee21cc9e?w=800",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800",
    ],
    amenities:     ["WiFi", "Pool", "Parking", "Restaurant"],
    pricePerNight: 2800,
    totalRooms:    90,
    rating:        4.1,
  },
]

const adminUser = {
  name:     "Admin User",
  email:    "admin@stayeasy.com",
  password: "admin123456",
  role:     "admin" as const,
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log("✅ Connected to MongoDB Atlas")

    await Hotel.deleteMany({})
    await User.deleteMany({})
    console.log("🗑️  Cleared existing data")

    const createdHotels = await Hotel.insertMany(hotels)
    console.log(`🏨  Seeded ${createdHotels.length} hotels`)

    const admin = await User.create(adminUser)
    console.log(`👤  Seeded admin: ${admin.email}`)

    console.log("\n✅ Database seeded successfully!")
    console.log("─────────────────────────────────")
    console.log("Admin Login:")
    console.log("  Email:    admin@stayeasy.com")
    console.log("  Password: admin123456")
    console.log("─────────────────────────────────")

    process.exit(0)

  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedDB();
