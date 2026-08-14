import {NewsPage} from "./features/news/pages/NewsPage.tsx";
import {MainPage} from "./features/main/pages/MainPage.tsx";

export default function App() {
    return  (
        <>
            <NewsPage />
            <MainPage />
          <div style={{ color: "white", fontSize: "30px" }}>
            TEST ISHLAYAPTI
          </div>
        </>

    );
}