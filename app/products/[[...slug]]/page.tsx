type Props = {
  params: {
    slug: string[];
  };
};
// to catch multiple url segments/slugs create a folder
// with this name "[...segments] "inside of it a page.tsx component
// here we have access to all the url segments passed
// "[...segments]" requires at least one parameter
// to make it optional use "[[...segments]]"
const ProductPage = ({ params: { slug } }: Props) => {
  return (
    <div>
      ProductPage
      <br />
      {slug}
    </div>
  );
};
export default ProductPage;
