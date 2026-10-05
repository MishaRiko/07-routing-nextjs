"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";

import css from "./notes.module.css";

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setPage(1);
  }, 500);

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={totalPages} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}