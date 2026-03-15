interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

export default PageWrapper;