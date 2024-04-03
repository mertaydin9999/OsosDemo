import ButtonInput from "../UI/button/ButtonInput";
import styles from "./Pagination.module.css";
const RenderPaginationButtons = ({
  currentPage,
  totalPages,
  setCurrentPage,
  length,
}) => {
  const getAdjacentPages = (currentPage, total, adjacent = 2) => {
    let pages = [];
    for (let i = currentPage - adjacent; i <= currentPage + adjacent; i++) {
      if (i > 0 && i <= total) {
        pages.push(i);
      }
    }
    return pages;
  };
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const adjacentPages = getAdjacentPages(currentPage, totalPages);
  return (
    <div className={styles.pages}>
      <p className={styles.pagenumbers}>
        Sayfa {currentPage} / {totalPages} <span>({length?.length} öğe)</span>
      </p>
      <div style={{ display: "flex", gap: "0em 1em" }}>
        <ButtonInput onClick={() => changePage(1)}>İlk</ButtonInput>
        <ButtonInput onClick={() => changePage(currentPage - 1)}>
          Önceki
        </ButtonInput>
        {adjacentPages.map((page) => (
          <ButtonInput
            key={page}
            onClick={() => changePage(page)}
            className={page === currentPage ? styles.activePageButton : ""}
          >
            {page}
          </ButtonInput>
        ))}
        <ButtonInput onClick={() => changePage(currentPage + 1)}>
          Sonraki
        </ButtonInput>
        <ButtonInput onClick={() => changePage(totalPages)}>Son</ButtonInput>
      </div>
    </div>
  );
};
export default RenderPaginationButtons;
