// first add searchParams to the interface since query-parameters are passed as second object to the props
type Props = {
  params: {
    slug: string[];
  };
  searchParams: {
    sortOrder: string,
    limit: number,
  }
};

// to catch multiple url segments/slugs create a folder
// with this name "[...segments] "inside of it a page.tsx component
// here we have access to all the url segments passed
// "[...segments]" requires at least one parameter
// to make it optional use "[[...segments]]"
//
//A URL slug refers to the end part of a URL after the backslash (“/”) that identifies the specific page or post. Each slug on your web pages needs to be unique, and they provide readers and search engines alike with information about the contents of a web page or post.

// accessing query-parameters 
const ProductPage = ({ params: { slug }, searchParams: {sortOrder, limit}}: Props) => {
  return (
    <div>
      ProductPage
      <br />
      {slug}
      <br />
      <p>sortOrder: {sortOrder}
      </p>
      <p>limit: {limit}</p>
    </div>
  );
};
export default ProductPage;
