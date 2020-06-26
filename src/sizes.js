export default {
    up() {

    },
    down(size) {
        const sizes = {
            xs: "576px",
            sm: "767px",
            md: "991px",
            lg: "1199px",
        };
        return `@media (max-width: ${sizes[size]})`
    }
};