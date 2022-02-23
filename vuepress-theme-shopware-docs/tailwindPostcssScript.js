export default (ctx) => {
  /**
   * Replace all <style type="text/css"> tags with <style type="postcss"> tags
   * as they're interpretted correctly during tailwind JIT compilation.
   */
  async function reloadCssWithPostcss() {
    const elements = document.querySelectorAll("style[type='text/css']");
    elements.forEach((element) => (element.type = "postcss"));
  }

  ctx.Vue.mixin({
    mounted() {
      reloadCssWithPostcss();
    },
  });
};
