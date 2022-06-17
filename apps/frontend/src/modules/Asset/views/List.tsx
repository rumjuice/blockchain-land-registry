import { FC } from "react";

const List: FC = () => {
  return (
    <>
      <iframe
        className="w-full h-64 mt-8 mb-4"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5613.513741277526!2d-79.41348504077459!3d43.67592552614158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1655441998679!5m2!1sen!2sca"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        tabIndex={0}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <h2 className="text-lg font-medium text-rose-900">Asset List</h2>
    </>
  );
};

export default List;
