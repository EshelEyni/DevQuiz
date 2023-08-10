import { Footer } from "../../Gen/Footer";

export const AppFooter = () => {
  return (
    <Footer>
      <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-between bg-indigo-900 px-10 text-4xl text-indigo-300">
        <p>
          Created By
          <a
            href="https://github.com/EshelEyni"
            target="_blank"
            className="font-semibold text-white hover:underline mx-1"
          >
            Eshel Eyni
          </a>
          , 2023
        </p>
      </div>
    </Footer>
  );
};
