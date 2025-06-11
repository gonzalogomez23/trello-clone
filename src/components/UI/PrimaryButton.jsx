const PrimaryButton = ({ className = '', children, ...props }) => {
  return (
    <button
      type="button"
      className={`rounded-lg text-white bg-primary hover:bg-secondary transition-all w-fit whitespace-nowrap flex items-center gap-2 py-2.5 px-5 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
