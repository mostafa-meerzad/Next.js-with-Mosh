// "use client"; // move this directive to the AddToCard component

import AddToCard from "./AddToCard";
import styles from "./ProductCard/ProductCard.module.css"

const ProductCard = () => {
  return (
    <div className={styles.card}>
      ProductCard
      {/* 
       server components cannot handle user interactivity
       following code throws a Runtime Error*/}
      {/* <button onClick={() => console.log("btn clicked")}>Add to Card</button> */}
      {/*the solution is to make it a Client-Side component
        you can make this entire component a client-side component or the better way just extract that part that needs to handle client interaction a client-side component
        */}
      {/* render client-side AddToCard component here */}
      <AddToCard />
    </div>
  );
};
export default ProductCard;
