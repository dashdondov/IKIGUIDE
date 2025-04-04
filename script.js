// Multi-step questionnaire logic
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const submitBtn = document.getElementById("submitBtn");
  const retryBtn = document.getElementById("retryBtn");
  
  let currentStep = 0;
  if (steps.length > 0) steps[currentStep].classList.add("active");

  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      const answer1 = document.getElementById("answer1").value.trim();
      const answer2 = document.getElementById("answer2").value.trim();
      const answer3 = document.getElementById("answer3").value.trim();
      const answer4 = document.getElementById("answer4").value.trim();

      document.getElementById("aiConclusion").textContent = "Түр хүлээнэ үү...";

      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer1, answer2, answer3, answer4 })
        });
        const data = await response.json();
        document.getElementById("aiConclusion").textContent = data.ikigaiConclusion || "Хариу олдсонгүй.";
      } catch (error) {
        console.error("Error fetching AI:", error);
        document.getElementById("aiConclusion").textContent = "Алдаа гарлаа.";
      }
      
      steps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      document.getElementById("answer1").value = "";
      document.getElementById("answer2").value = "";
      document.getElementById("answer3").value = "";
      document.getElementById("answer4").value = "";
      steps[currentStep].classList.remove("active");
      currentStep = 0;
      steps[currentStep].classList.add("active");
    });
  }
});

// Toggle checkbox state (for task pages)
function toggleCheck(element) {
  element.classList.toggle("checked");
}