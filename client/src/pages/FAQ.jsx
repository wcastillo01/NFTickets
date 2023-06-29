import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqData = [
    {
      question: "Where can I get some?",
      answer:
        "Sed et erat lacinia nisi commodo sollicitudin ornare in purus. Duis condimentum quam a lacus finibus, a ullamcorper nunc egestas. Nam luctus in libero ac rhoncus. Vestibulum elementum aliquet rutrum. Curabitur pretium eleifend leo, a pulvinar elit imperdiet sed. Vestibulum ut purus eleifend, elementum ex ac, iaculis lorem. Mauris faucibus massa nec nisi iaculis, ac consectetur mi finibus. ",
    },
    {
      question: "Where does it come from?",
      answer:
        "Donec convallis nisi nec neque lacinia imperdiet. Nullam cursus tempor hendrerit. Integer commodo imperdiet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam neque lacus, aliquam et enim sit amet, venenatis semper orci. Proin a lacinia ligula. Aenean non nisl et nisl bibendum fringilla vel vitae purus. ",
    },
    {
      question: "Why do we use it?",
      answer:
        "In convallis nulla risus, id faucibus mauris rhoncus sed. Aenean sagittis diam eu tortor molestie mattis. Sed vel nunc non urna rutrum tristique. Mauris mollis sapien sapien, ac pretium tellus eleifend sit amet. Fusce iaculis convallis leo, sed convallis augue fringilla non. Quisque at ullamcorper ex, in malesuada est. Vivamus non dolor mauris. Ut commodo sapien eget quam fermentum, non laoreet metus feugiat. ",
    },
  ];

  return (
    <div className="bg-gradient-bg-welcome-light min-h-screen flex justify-center items-center">
      <div
        className="bg-white w-full max-w-md bg-blue-glassmorphism p-4 rounded-lg border border-gradient-bg-welcome-dark shadow-lg"
        style={{ marginTop: "-250px" }}
      >
        <h2 className="text-2xl font-bold mb-8 text-black">
          Preguntas Frecuentes
        </h2>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-4 cursor-pointer"
            onClick={() => handleAccordionClick(index)}
          >
            <h3 className="text-lg font-bold text-black">{item.question}</h3>
            {activeIndex === index && (
              <p className="mt-2 text-sm text-black">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
