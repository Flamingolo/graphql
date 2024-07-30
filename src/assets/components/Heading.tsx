import React from "react";

interface HeadingProps {
  text: string;
}

const randomEmoji = () => {
  // Unicode range for emojis
  const emojiRange = [
    0x1F600, // Grinning face
    0x1F64F, // Folded hands
  ];

  const randomCodePoint = Math.floor(
    Math.random() * (emojiRange[1] - emojiRange[0] + 1)
  ) + emojiRange[0];

  return String.fromCodePoint(randomCodePoint);
};

const Heading: React.FC<HeadingProps> = ({ text }) => {
  const maxLength = 9;
  const maxEmojis = 5;
  let paddedText = text;

  if (text.length < maxLength) {
    const paddingLength = Math.min(maxLength - text.length, maxEmojis);
    const padding = Array.from({ length: paddingLength }, () => randomEmoji()).join("");
    paddedText = `${text} ${padding}`;
  }

  return <h2>{paddedText}</h2>;
};

export default Heading;