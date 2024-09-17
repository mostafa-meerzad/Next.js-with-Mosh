"use client"
// this component is the one rendered when an unexpected error happens like failed to get data from an api
// this has to be a client-side component
// we have access to the error that occurred through the props
// there is a reset function passed by Next.js along with the error through the props and that allows us to 
// give the user a second chance to retry 
interface Props {
    error: Error
    reset: () => void
}

const Error = ({ error, reset}: Props) => {
    console.log("-----------------------------------")
    console.log(error)
    console.log("-----------------------------------")
  return (
    <div>Error

        <button onClick={() => reset()} className={"btn"}>Retry</button>
    </div>
  )
}
export default Error