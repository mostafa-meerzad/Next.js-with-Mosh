// a dynamic route is a route with parameter
// dynamic routes are defined this way
// the folder name is like this "[parameter]"
// then define a "page.tsx/jsx" component
// then we have access to that parameter in page component as props under "params"
// NOTE: these parameters are only accessible in page level

import { notFound } from "next/navigation";

// if you have a component that needs to have access to parameter you need to get the parameter at page level and pass it as a prop to that component
type Props = {
  params: {
    id: number;
  };
};
const UserDetails = (props: Props) => {
  // we want to show a not-found page for the userId greater than 10
  // call not-found function which is defined in next/navigation module to programmatically call not-found page
  if(props.params.id > 10) notFound()
  return <div>user id: {props.params.id}</div>;
};
export default UserDetails;
