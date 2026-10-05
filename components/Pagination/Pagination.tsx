import type { FC } from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, pageCount }) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); // React Paginate 0-indexed
  };

  return (
    <ReactPaginate
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      forcePage={page - 1}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      // pageClassName={css.pageItem}
      // pageLinkClassName={css.pageLink}
      // previousClassName={css.pageItem}
      // nextClassName={css.pageItem}
      // previousLinkClassName={css.pageLink}
      // nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      // disabledClassName={css.disabled}
    />
  );
};

export default Pagination;