import Banner from "./_components/Banner";
import Header from "./_components/Header";
import Header2 from "./_components/Header2";
import Subjects from "./_components/Categories";

const Page = () => {
  return (
    <div className="space-y-20 p-4 sm:px-6 lg:px-8">
      <Header />
      <Banner />
      <Header2 />
      <Subjects />
    </div>
  );
};

export default Page;
