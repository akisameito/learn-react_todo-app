// extendThemeを利用してグルーバルに適用したいテーマを設定
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "orange.50",
                color: "gray.800",
            },
            p: {
                // mdを境にSP表示とPC表示を切り替え
                // SP表示で md = 1rem     = 16px
                // PC表示で lg = 1.125rem = 18px
                fontSize: { base: "md", md: "lg" },
                lineHeight: "tall"
            }
        }
    }
});

export default theme;
