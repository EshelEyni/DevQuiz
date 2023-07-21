import { Footer } from "../../Gen/Footer";
import "./AppFooter.scss";

export const AppFooter = () => {
  return (
    <Footer>
      <div className="app-footer">
        <p>
          Created By{" "}
          <a href="https://github.com/EshelEyni" target="_blank">
            Eshel Eyni
          </a>
          , 2023
        </p>
      </div>
    </Footer>
  );
};
