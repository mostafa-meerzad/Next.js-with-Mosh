import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Tailwind,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      {/* <Body style={{background:"darkGray"}}> */}
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="text-3xl font-bold">Hello {name}</Text>
            <Link href="https://google.com">google.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// annotate the style object with "CSSProperties" which is coming from "react" to get css intellisense
// const body: CSSProperties = {
//   background: "#fff",
// };

// const heading: CSSProperties = {
//     fontSize: "32px",
//     fontWeight: "bold"
// }
export default WelcomeTemplate;
