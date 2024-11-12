const PrimaryButton = (props) => {
  return (
    <button type="button" class="text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5">{props.children}</button>
  )
}

export default PrimaryButton
