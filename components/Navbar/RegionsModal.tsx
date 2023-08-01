"use client";

import countries from "@/data/countries.json";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateCountry } from "@/store/states/country";
import { useRouter } from "next/navigation";

const RegionsModal = ({
  checkbox,
}: {
  checkbox: React.MutableRefObject<HTMLInputElement>;
}) => {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) => state.country);
  const [countryCode, setCountryCode] = useState(country.code);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryCode(e.currentTarget.value);
  };

  const handleUpdate = () => {
    const { alpha2, name } = countries.filter(
      (country) => country.alpha2 === countryCode
    )[0];

    const newCountry = {
      name: name,
      code: alpha2,
    };

    router.push(`/${alpha2}/general`);
    checkbox.current.checked = false;
    return dispatch(updateCountry(newCountry));
  };

  return (
    <>
      <div className="modal" id="my-modal-2">
        <div className="modal-box h-5/6 pb-0">
          {countries.map((country) => (
            <label className="label cursor-pointer" key={country.id}>
              <span className="label-text">{country.name}</span>
              <input
                type="radio"
                name="radio"
                className="radio checked:bg-blue-700"
                value={country.alpha2}
                onChange={handleChange}
                {...(countryCode === country.alpha2 && { checked: true })}
              />
            </label>
          ))}
          <div className="modal-action sticky bottom-0 mt-0 gap-2 bg-base-100 py-5 ">
            <a href="#" className="btn">
              Cancel
            </a>
            <a href="#" className="btn" onClick={handleUpdate}>
              Update
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionsModal;
