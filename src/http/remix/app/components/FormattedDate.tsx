import React, { FC } from "react";

const FormattedDate: FC<{ date: string }> = function FormattedDate({ date }) {
  // TODO format better. Do not show the year if it's the current year, show "yesterday" instead of yesterday's date, etc.
  return <span className="date">{date}</span>;
};

export default FormattedDate;
