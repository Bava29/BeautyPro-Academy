
document.addEventListener("DOMContentLoaded", function () {

    const root = document.documentElement;

    // =====================================
    // SIDEBAR TOGGLE
    // =====================================

    const sidebar = document.getElementById("dashboardSidebar");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
        sidebar.classList.add("sidebar-open");
        sidebarOverlay.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
    }

    function closeSidebar() {
        sidebar.classList.remove("sidebar-open");
        sidebarOverlay.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
    }

    menuToggle.addEventListener("click", function () {
        if (sidebar.classList.contains("sidebar-open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarOverlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
            closeLogoutModal();
        }
    });

    // Close sidebar when a menu link is selected on mobile/tablet
    document.querySelectorAll(".sidebar-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    // =====================================
    // DARK MODE
    // =====================================

    const themeToggle = document.querySelector(".theme-toggle");

    function updateThemeButton() {
        const isDark = root.classList.contains("dark-mode");

        themeToggle.innerHTML = isDark
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';

        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        const logoPath = isDark ? "images/logo-white.png" : "images/logo.png";
        document.querySelectorAll('img[src="images/logo.png"], img[src="images/logo-white.png"]')
            .forEach(function (logo) {
                logo.setAttribute("src", logoPath);
            });
    }

    themeToggle.addEventListener("click", function () {

        const isDark = root.classList.toggle("dark-mode");

        localStorage.setItem(
            "beautypro-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });

    // =====================================
    // RTL MODE
    // =====================================

    const rtlToggle = document.querySelector(".rtl-toggle");

    function updateRTLButton() {
        const isRTL = root.getAttribute("dir") === "rtl";

        rtlToggle.innerHTML = isRTL
            ? '<i class="bi bi-arrow-left-right"></i>'
            : '<i class="bi bi-arrow-left-right"></i>';

        rtlToggle.setAttribute("aria-pressed", String(isRTL));

        rtlToggle.setAttribute(
            "aria-label",
            isRTL ? "Switch to LTR" : "Switch to RTL"
        );
    }

    rtlToggle.addEventListener("click", function () {

        const newDirection =
            root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

        root.setAttribute("dir", newDirection);

        localStorage.setItem(
            "beautypro-direction",
            newDirection
        );

        updateRTLButton();
    });

    // =====================================
    // LOGOUT CONFIRMATION
    // =====================================

    const logoutButton = document.getElementById("logoutButton");
    const logoutModal = document.getElementById("logoutModal");
    const cancelLogout = document.getElementById("cancelLogout");
    const confirmLogout = document.getElementById("confirmLogout");

    function openLogoutModal() {
        logoutModal.classList.add("show");
        logoutModal.setAttribute("aria-hidden", "false");
        cancelLogout.focus();
    }

    function closeLogoutModal() {
        logoutModal.classList.remove("show");
        logoutModal.setAttribute("aria-hidden", "true");
    }

    logoutButton.addEventListener("click", openLogoutModal);

    cancelLogout.addEventListener("click", function () {
        closeLogoutModal();
        logoutButton.focus();
    });

    logoutModal.querySelector(".logout-modal-backdrop")
        .addEventListener("click", closeLogoutModal);

    confirmLogout.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    // =====================================
    // LOAD SAVED PREFERENCES
    // =====================================

    const savedTheme = localStorage.getItem("beautypro-theme");
    const savedDirection = localStorage.getItem("beautypro-direction");

    root.classList.toggle("dark-mode", savedTheme === "dark");

    root.setAttribute(
        "dir",
        savedDirection === "rtl" ? "rtl" : "ltr"
    );

    updateThemeButton();
    updateRTLButton();

});


document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       1. LICENSING EXAM PREP - QUIZ
    ========================================== */

    const quizArea = document.getElementById("lepQuizArea");

    if (quizArea) {

        const questions = [
            {
                question: "Which solution is commonly used to disinfect non-porous salon tools?",
                options: [
                    "Plain water",
                    "EPA-registered disinfectant",
                    "Perfume",
                    "Hand lotion"
                ],
                answer: 1,
                explanation: "EPA-registered disinfectants are used according to their label instructions to disinfect appropriate salon tools."
            },
            {
                question: "What is cross-contamination?",
                options: [
                    "Cleaning the salon floor",
                    "Transferring harmful microorganisms from one surface to another",
                    "Washing your hands",
                    "Organizing beauty products"
                ],
                answer: 1,
                explanation: "Cross-contamination happens when harmful microorganisms transfer between people, tools or surfaces."
            },
            {
                question: "What is the largest organ of the human body?",
                options: [
                    "Heart",
                    "Liver",
                    "Skin",
                    "Lungs"
                ],
                answer: 2,
                explanation: "The skin is the largest organ of the human body and acts as a protective barrier."
            },
            {
                question: "Why is client consultation important before a beauty service?",
                options: [
                    "To understand client needs and relevant health information",
                    "To increase service duration",
                    "To avoid explaining the service",
                    "To select products randomly"
                ],
                answer: 0,
                explanation: "Client consultation helps identify expectations, preferences, contraindications and suitable services."
            },
            {
                question: "What should you do before using a chemical product?",
                options: [
                    "Mix it with any available product",
                    "Ignore the instructions",
                    "Read and follow the manufacturer's directions",
                    "Apply it immediately"
                ],
                answer: 2,
                explanation: "Always follow product directions, safety precautions and required testing procedures."
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let answered = false;

        const questionNumber = document.getElementById("lepQuestionNumber");
        const quizPercent = document.getElementById("lepQuizPercent");
        const progressFill = document.getElementById("lepQuizProgressFill");
        const questionText = document.getElementById("lepQuestionText");
        const answerOptions = document.getElementById("lepAnswerOptions");
        const answerFeedback = document.getElementById("lepAnswerFeedback");
        const nextButton = document.getElementById("lepNextQuestion");

        const quizResult = document.getElementById("lepQuizResult");
        const finalScore = document.getElementById("lepFinalScore");
        const resultMessage = document.getElementById("lepResultMessage");
        const retryButton = document.getElementById("lepRetryQuiz");


        /* RENDER QUESTION */

        function loadQuestion() {

            answered = false;

            const question = questions[currentQuestion];

            questionNumber.textContent =
                "Question " + (currentQuestion + 1) +
                " of " + questions.length;

            const percentage =
                (currentQuestion / questions.length) * 100;

            quizPercent.textContent =
                Math.round(percentage) + "% Completed";

            progressFill.style.width = percentage + "%";

            questionText.textContent = question.question;

            answerOptions.innerHTML = "";

            answerFeedback.textContent = "";
            answerFeedback.style.color = "";

            nextButton.disabled = true;

            nextButton.innerHTML =
                currentQuestion === questions.length - 1
                    ? 'View Results <i class="bi bi-arrow-right"></i>'
                    : 'Next Question <i class="bi bi-arrow-right"></i>';


            question.options.forEach(function (option, index) {

                const button = document.createElement("button");

                button.type = "button";
                button.textContent =
                    String.fromCharCode(65 + index) + ". " + option;

                button.addEventListener("click", function () {
                    selectAnswer(index, button);
                });

                answerOptions.appendChild(button);

            });

        }


        /* CHECK ANSWER */

        function selectAnswer(selectedIndex, selectedButton) {

            if (answered) return;

            answered = true;

            const question = questions[currentQuestion];

            const allOptions =
                answerOptions.querySelectorAll("button");

            allOptions.forEach(function (button) {
                button.disabled = true;
            });

            if (selectedIndex === question.answer) {

                score++;

                selectedButton.classList.add("correct");

                answerFeedback.textContent =
                    "Correct! " + question.explanation;

                answerFeedback.style.color = "#329B64";

            } else {

                selectedButton.classList.add("wrong");

                allOptions[question.answer].classList.add("correct");

                answerFeedback.textContent =
                    "Incorrect. " + question.explanation;

                answerFeedback.style.color = "#D85C5C";

            }

            nextButton.disabled = false;

        }


        /* NEXT QUESTION */

        nextButton.addEventListener("click", function () {

            if (!answered) return;

            if (currentQuestion < questions.length - 1) {

                currentQuestion++;

                loadQuestion();

            } else {

                showResults();

            }

        });


        /* SHOW FINAL RESULT */

        function showResults() {

            quizArea.style.display = "none";
            quizResult.style.display = "block";

            const percentage =
                Math.round((score / questions.length) * 100);

            finalScore.textContent =
                score + " / " + questions.length;

            quizPercent.textContent = "100% Completed";
            progressFill.style.width = "100%";

            if (percentage === 100) {

                resultMessage.textContent =
                    "Excellent work! You answered every question correctly.";

            } else if (percentage >= 60) {

                resultMessage.textContent =
                    "Good job! Keep practicing to improve your knowledge.";

            } else {

                resultMessage.textContent =
                    "Keep learning! Review your study materials and try again.";

            }

        }


        /* RETRY QUIZ */

        retryButton.addEventListener("click", function () {

            currentQuestion = 0;
            score = 0;
            answered = false;

            quizResult.style.display = "none";
            quizArea.style.display = "block";

            loadQuestion();

        });


        /* INITIAL LOAD */

        loadQuestion();

    }



    /* ==========================================
       2. EXAM PREPARATION CHECKLIST
    ========================================== */

    const checklistItems =
        document.querySelectorAll(".lep-check-item input[data-task]");

    const taskCount =
        document.getElementById("lepTaskCount");

    const taskProgress =
        document.getElementById("lepTaskProgress");

    const taskProgressFill =
        document.getElementById("lepTaskProgressFill");


    if (checklistItems.length > 0) {

        const totalTasks = checklistItems.length;


        /* RESTORE SAVED CHECKLIST */

        checklistItems.forEach(function (checkbox) {

            const taskName = checkbox.dataset.task;

            const savedStatus =
                localStorage.getItem("beautypro-exam-" + taskName);

            checkbox.checked = savedStatus === "true";

        });


        /* UPDATE CHECKLIST PROGRESS */

        function updateChecklistProgress() {

            let completedTasks = 0;

            checklistItems.forEach(function (checkbox) {

                if (checkbox.checked) {
                    completedTasks++;
                }

            });

            const percentage =
                Math.round((completedTasks / totalTasks) * 100);

            if (taskCount) {
                taskCount.textContent = completedTasks;
            }

            if (taskProgress) {
                taskProgress.textContent = percentage + "%";
            }

            if (taskProgressFill) {
                taskProgressFill.style.width = percentage + "%";
            }

        }


        /* SAVE CHECKLIST WHEN CHANGED */

        checklistItems.forEach(function (checkbox) {

            checkbox.addEventListener("change", function () {

                const taskName = checkbox.dataset.task;

                localStorage.setItem(
                    "beautypro-exam-" + taskName,
                    checkbox.checked
                );

                updateChecklistProgress();

            });

        });


        /* INITIAL PROGRESS */

        updateChecklistProgress();

    }

});


/* ==========================================
   PAYMENTS & RECEIPTS - DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------
       1. PAYMENT HISTORY SEARCH & FILTER
    ---------------------------------- */

    const paySearchInput = document.getElementById("paySearchInput");
    const payStatusFilter = document.getElementById("payStatusFilter");
    const payHistoryBody = document.getElementById("payHistoryBody");
    const payVisibleCount = document.getElementById("payVisibleCount");
    const payNoResults = document.getElementById("payNoResults");

    if (paySearchInput && payStatusFilter && payHistoryBody) {

        function filterPaymentHistory() {

            const searchValue = paySearchInput.value
                .toLowerCase()
                .trim();

            const selectedStatus = payStatusFilter.value;

            const rows = payHistoryBody.querySelectorAll(
                "tr[data-status]"
            );

            let visibleCount = 0;

            rows.forEach(function (row) {

                const rowText = row.textContent.toLowerCase();
                const rowStatus = row.dataset.status;

                const matchesSearch =
                    rowText.includes(searchValue);

                const matchesStatus =
                    selectedStatus === "all" ||
                    rowStatus === selectedStatus;

                if (matchesSearch && matchesStatus) {

                    row.style.display = "";
                    visibleCount++;

                } else {

                    row.style.display = "none";

                }

            });

            if (payVisibleCount) {
                payVisibleCount.textContent = visibleCount;
            }

            if (payNoResults) {
                payNoResults.style.display =
                    visibleCount === 0 ? "table-row" : "none";
            }

        }

        paySearchInput.addEventListener(
            "input",
            filterPaymentHistory
        );

        payStatusFilter.addEventListener(
            "change",
            filterPaymentHistory
        );

        filterPaymentHistory();

    }


    /* ----------------------------------
       2. RECEIPT DOWNLOAD
    ---------------------------------- */

    function downloadPaymentReceipt(button) {

        const transactionId = button.dataset.receipt;
        const paymentDate = button.dataset.date;
        const description = button.dataset.description;
        const paymentMethod = button.dataset.method;
        const amount = Number(button.dataset.amount);

        if (!transactionId || !paymentDate || !description ||
            !paymentMethod || !Number.isFinite(amount)) {

            alert("Receipt details are unavailable.");
            return;

        }

        const formattedAmount = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);

        const receiptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Payment Receipt - ${transactionId}</title>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 35px 15px;
        background: #f5f1ed;
        font-family: Arial, sans-serif;
        color: #463B35;
    }

    .receipt {
        max-width: 650px;
        margin: auto;
        padding: 40px;
        background: #ffffff;
        border: 1px solid #eadfd7;
    }

    .receipt-header {
        text-align: center;
        padding-bottom: 25px;
        border-bottom: 2px solid #C9683C;
    }

    .receipt-header h1 {
        margin: 0 0 8px;
        color: #C9683C;
        font-size: 27px;
    }

    .receipt-header p {
        margin: 0;
        color: #777;
        font-size: 14px;
    }

    .receipt-title {
        margin: 30px 0 20px;
        text-align: center;
    }

    .receipt-title h2 {
        margin: 0 0 8px;
        font-size: 23px;
    }

    .receipt-title span {
        color: #28734B;
        font-size: 13px;
        font-weight: bold;
    }

    .receipt-details {
        margin-top: 25px;
        border-top: 1px solid #eee;
    }

    .receipt-row {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        font-size: 14px;
    }

    .receipt-row span {
        color: #777;
    }

    .receipt-row strong {
        text-align: right;
    }

    .receipt-total {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        padding: 20px;
        background: #FFF8F1;
        color: #C9683C;
        font-size: 20px;
        font-weight: bold;
    }

    .receipt-footer {
        margin-top: 35px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        text-align: center;
        color: #777;
        font-size: 12px;
        line-height: 1.7;
    }

    .print-button {
        display: block;
        margin: 25px auto 0;
        padding: 12px 25px;
        border: none;
        border-radius: 6px;
        background: #C9683C;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }

    @media print {
        body {
            padding: 0;
            background: #fff;
        }

        .receipt {
            border: none;
        }

        .print-button {
            display: none;
        }
    }
</style>
</head>

<body>

<div class="receipt">

    <div class="receipt-header">
        <h1>BeautyPro Academy</h1>
        <p>Professional Beauty Education</p>
    </div>

    <div class="receipt-title">
        <h2>Payment Receipt</h2>
        <span>PAYMENT COMPLETED</span>
    </div>

    <div class="receipt-details">

        <div class="receipt-row">
            <span>Transaction ID</span>
            <strong>${transactionId}</strong>
        </div>

        <div class="receipt-row">
            <span>Payment Date</span>
            <strong>${paymentDate}</strong>
        </div>

        <div class="receipt-row">
            <span>Program</span>
            <strong>Professional Cosmetology</strong>
        </div>

        <div class="receipt-row">
            <span>Description</span>
            <strong>${description}</strong>
        </div>

        <div class="receipt-row">
            <span>Payment Method</span>
            <strong>${paymentMethod}</strong>
        </div>

        <div class="receipt-row">
            <span>Payment Status</span>
            <strong>Completed</strong>
        </div>

    </div>

    <div class="receipt-total">
        <span>Amount Paid</span>
        <span>${formattedAmount}</span>
    </div>

    <div class="receipt-footer">
        <p>This is a sample digital receipt generated by the student dashboard.</p>
        <p>For official payment confirmation, contact academy administration.</p>
        <p>Thank you for choosing BeautyPro Academy!</p>
    </div>

    <button class="print-button" onclick="window.print()">
        Print / Save as PDF
    </button>

</div>

</body>
</html>`;

        const blob = new Blob(
            [receiptHTML],
            { type: "text/html;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");

        downloadLink.href = url;
        downloadLink.download = "Receipt-" + transactionId + ".html";

        document.body.appendChild(downloadLink);

        downloadLink.click();

        downloadLink.remove();

        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);

    }


    /* ----------------------------------
       3. ATTACH RECEIPT DOWNLOAD BUTTONS
    ---------------------------------- */

    const receiptButtons = document.querySelectorAll(
        ".pay-download-btn, .pay-document-download"
    );

    receiptButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            downloadPaymentReceipt(button);

        });

    });

});
