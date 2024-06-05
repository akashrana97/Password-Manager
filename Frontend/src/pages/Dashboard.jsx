import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faTrash,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/PasswordList.css";
import {
  AddPasswordList,
  GetPasswordList,
} from "../store/PasswordList/passwordListReducer";
import { useDispatch, useSelector } from "react-redux";
import PasswordModal from "../Components/PasswordModal";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ReactPaginate from "react-paginate";
import "../styles/ReactTable.css"; // Create and style this CSS file as needed

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const PasswordListData = useSelector((state) => state.PasswordList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPasswordList());
    const handleClickOutside = (event) => {
      if (contextMenu && !event.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu, dispatch]);

  const handleAddPassword = (data) => {
    dispatch(AddPasswordList(data));
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = useMemo(() => {
    return PasswordListData.filter(
      (item) =>
        item.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.website_url.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [PasswordListData, searchInput]);

  const handleEdit = (index) => {
    // Implement edit functionality here
    console.log("Edit item at index", index);
  };

  const handleDelete = (index) => {
    // Implement delete functionality here
    // setPasswords(passwords.filter((_, i) => i !== index));
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      item,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCopyUsername = (username) => {
    navigator.clipboard.writeText(username);
    handleCloseContextMenu();
  };

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    handleCloseContextMenu();
  };

  const columns = useMemo(
    () => [
      { Header: "Site", accessor: "website_url" },
      { Header: "Username", accessor: "username" },
      { Header: "Password", accessor: "password" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="action-button"
              onClick={() => handleEdit(row.index)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="action-button"
              onClick={() => handleDelete(row.index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const handlePageClick = ({ selected }) => {
    gotoPage(selected);
  };

  return (
    <div className="password-manager">
      <header className="header">
        <h1>PassOP</h1>
        <h2>PassProtector: Your Secure Password Hub</h2>
      </header>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearch}
          className="search-input"
        />

        <button
          className="open-modal-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Password
        </button>
      </div>

      <PasswordModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPassword}
      />

      <table {...getTableProps()} className="password-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                onContextMenu={(e) => handleContextMenu(e, row.original)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(filteredData.length / pageSize)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={() => handleCopyUsername(contextMenu.item.username)}>
            <FontAwesomeIcon icon={faCopy} /> Copy Username
          </button>
          <button onClick={() => handleCopyPassword(contextMenu.item.password)}>
            <FontAwesomeIcon icon={faCopy} /> Copy Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
