import React from "react";
import { useEffect, useState } from "react";
import DataTables from "react-data-table-component";

export default function DataTable() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const getCountries = async () => {
    await fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {setFilteredCountries(data);setCountries(data)});
  };
  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "Country Flag",
      // eslint-disable-next-line jsx-a11y/alt-text
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
  ];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);
  return (
    <div>
      <DataTables
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search Here"
            className="form-control w-25"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        highlightOnHover
        title="Countries List"
        fixedHeaderScrollHeight="500px"
        fixedHeader
        columns={columns}
        data={filteredCountries}
        pagination
      />
    </div>
  );
}
