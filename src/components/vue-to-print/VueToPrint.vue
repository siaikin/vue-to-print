<script lang="tsx">
import { cloneVNode, defineComponent, toRefs } from "vue";
import { vueToPrintProps } from "./types";
import { useVueToPrint } from "./use-vue-to-print";

export default defineComponent({
  name: "VueToPrint",
  props: vueToPrintProps(),
  setup(props, { slots, expose }) {
    const { handlePrint } = useVueToPrint(toRefs(props));

    expose({ handlePrint });
    return () => {
      const { default: _default, trigger } = slots;

      if (trigger) {
        const vnodes = trigger();

        return vnodes.map((vnode) =>
          cloneVNode(vnode, {
            onClick: handlePrint
          })
        );
      } else {
        const value = { handlePrint: handlePrint };

        return _default?.(value);
      }
    };
  }
});
</script>

<style scoped></style>
