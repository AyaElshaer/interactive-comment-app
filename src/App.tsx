import { CommentForm } from "./comment/CommentForm";
import { CommentsList } from "./comment/CommentsList";

const App = () => {
  return (
    <>
      <main className="relative w-full flex justify-center bg-very-light-gray  py-2 lg:py-10">
        <div className=" w-[90%] lg:w-3/6">
          <CommentsList />
          <CommentForm />
        </div>
      </main>
    </>
  );
};

export default App;
