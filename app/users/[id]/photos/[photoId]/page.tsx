type Props = {
  params: {
    id: number;
    photoId: number;
  };
};
// in nested routes you have access to the parameters of their dynamic routes
const UserExtraDetail = (props: Props) => {
  return (
    <div>
      <h2>User extra detail</h2>
      <p>{props.params.id}</p>
      <p>{props.params.photoId}</p>
    </div>
  );
};
export default UserExtraDetail;
