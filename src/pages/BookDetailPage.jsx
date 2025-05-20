import BookDetail from "../components/BookDetail";
import { useParams } from "react-router-dom";

const BookDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
        <BookDetail id={id}/>
    </div>
  )
}

export default BookDetailPage