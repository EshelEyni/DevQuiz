import { Footer } from "../../Gen/Footer";

export const AppFooter = () => {
  return (
    <Footer>
      <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-between bg-gray-800 px-3 text-2xl text-gray-300">
        <p>
          Created By
          <a
            href="https://github.com/EshelEyni"
            target="_blank"
            rel="noreferrer"
            className="mx-1 font-semibold text-white hover:underline"
          >
            Eshel Eyni
          </a>
          , 2023
        </p>
      </div>
    </Footer>
  );
};
