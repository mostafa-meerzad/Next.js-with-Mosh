// a dynamic route is a route with parameter
// dynamic routes are defined this way
// the folder name is like this "[parameter]"
// then define a "page.tsx/jsx" component
// then we have access to that parameter in page component as props under "params"
// NOTE: these parameters are only accessible in page level
// if you have a component that needs to have access to parameter you need to get the parameter at page level and pass it as a prop to that component
type Props = {
  params: {
    id: number;
  };
};
const UserDetails = (props: Props) => {
  return <div>user id: {props.params.id}</div>;
};
export default UserDetails;
