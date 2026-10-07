import { useEffect } from "react";

// Shared by all four registration pages (Robowar/Robosoccer/RoboDrift/
// AlgoMaze), which all render the same `.robo-rail` (5 nodes, each
// linking to `#step-N`) beside the same `.robo-panel-step[id="step-N"]`
// panels. As the user scrolls through the form, this highlights the
// rail node for whichever step panel is currently passing through the
// "active band" (roughly the vertical middle of the viewport) by
// toggling `.is-active`, which the CSS fills with the page's own
// `--tone` colour — so the circle's background tracks scroll position
// instead of only lighting up on hover. Every PRECEDING step also gets
// `.is-complete` (e.g. on step 3, nodes/panels 1 and 2 stay highlighted
// too), since they're already filled in, not just the current one.
export default function useRailScrollSpy() {
  useEffect(() => {
    const steps = Array.from(document.querySelectorAll(".robo-panel-step[id]"));
    const nodes = Array.from(document.querySelectorAll(".robo-rail-node"));
    if (!steps.length || !nodes.length) return undefined;

    const setActive = (id) => {
      const activeIndex = steps.findIndex((step) => step.id === id);
      nodes.forEach((node, i) => {
        const isActive = node.getAttribute("href") === `#${id}`;
        node.classList.toggle("is-active", isActive);
        node.classList.toggle("is-complete", !isActive && i < activeIndex);
      });
      steps.forEach((step, i) => {
        step.classList.toggle("is-active", step.id === id);
        step.classList.toggle("is-complete", step.id !== id && i < activeIndex);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActive(topMost.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    steps.forEach((step) => observer.observe(step));
    setActive(steps[0].id);

    return () => observer.disconnect();
  }, []);
}
