import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

const API_URL = "https://contact.mediusware.com/api/contacts";

const Problem2 = () => {
  const [showAllContacts, setShowAllContacts] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = `${API_URL}?page=${page}&search=${search}&only_even=${onlyEven}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContacts((prevContacts) =>
          page === 1 ? data.results : [...prevContacts, ...data.results]
        );
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [page, search, onlyEven]);

  const handleAllContactsClick = () => {
    setShowAllContacts(true);
    setPage(1);
    setContacts([]);
  };

  const handleUsContactsClick = () => {
    setShowAllContacts(false);
    setPage(1);
    setContacts([]);
  };

  const handleCheckboxChange = (event) => {
    setOnlyEven(event.target.checked);
    setPage(1);
    setContacts([]);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-lg btn-outline-primary"
            onClick={handleAllContactsClick}
          >
            All Contacts
          </button>
          <button
            type="button"
            className="btn btn-lg btn-outline-warning"
            onClick={handleUsContactsClick}
          >
            US Contacts
          </button>
        </div>

        {showAllContacts ? (
          <ContactModal
            title="All Contacts"
            apiUrl={API_URL}
            search={search}
            setSearch={setSearch}
            onlyEven={onlyEven}
            handleCheckboxChange={handleCheckboxChange}
            contacts={contacts}
            loading={loading}
            setPage={setPage}
          />
        ) : (
          <ContactModal
            title="US Contacts"
            apiUrl={`${API_URL}?country=US`}
            search={search}
            setSearch={setSearch}
            onlyEven={onlyEven}
            handleCheckboxChange={handleCheckboxChange}
            contacts={contacts}
            loading={loading}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Problem2;
