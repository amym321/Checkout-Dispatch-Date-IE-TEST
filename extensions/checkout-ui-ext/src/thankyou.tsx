import React from "react";
import {
  useExtensionApi,
  useTranslate,
  useAttributes,
  Text,
  BlockStack,
} from "@shopify/checkout-ui-extensions-react";

export function Thankyou() {
  const { extensionPoint } = useExtensionApi();
  const translate = useTranslate();
  const attributes = useAttributes();
  let dispatched = "";
  if (attributes && attributes.length > 0) {
    //get attribute preOrderDate
    const filteredAttributes = attributes.filter(
      (item) => item.key === "preOrderDate:"
    );
    filteredAttributes.sort((a, b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
    dispatched = filteredAttributes[0].value;
  }
  // convert Date DD/MM
  let date = "";
  if (dispatched) {
    let dateDispatched = new Date(dispatched);
    let day = dateDispatched.getDate();
    let month = dateDispatched.getMonth() + 1;
    let dd = day < 10 ? "0" + day : day;
    let mm = month < 10 ? "0" + month : month;
    date = `${dd}/${mm}`;
  }
  const dateDispatchedText = date ? `Order to be dispatched by ${date}` : "";
  return (
    <BlockStack inlineAlignment="start">
      <Text size="base" emphasis="bold" style={{color: "#4047BA"}}>
        {dateDispatchedText}
      </Text>
    </BlockStack>
  );
}
