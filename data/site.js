export const SITE = {
  name: "Syed Shayan",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "shayansyed712@gmail.com",
  linkedin: "https://www.linkedin.com/in/thesyedshayan",
  github: "https://github.com/Syed-Shayan-01",
  githubUser: "Syed-Shayan-01",
  resume: "/resume.pdf", // put your PDF in /public/resume.pdf (set to "" to hide the buttons)
};
export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent("Hello Shayan")}`;

export const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

export const EDU = {
  university: {
    t: "BS Data Science",
    s: "Dawood University of Engineering & Technology (DUET), Karachi",
    y: "2025 – Present",
    d: "Developing a foundation in programming, mathematics, statistics, data structures, and data science.",
  },
  intermediate: {
    t: "Intermediate in Computer Science",
    s: "Grade: A (70.91%)",
    y: "Aug 2023 – May 2025",
    d: "Completed my Intermediate education with an A grade, specializing in Computer Science. Built a strong foundation in core computing concepts and gained hands-on programming experience with the C language, which strengthened my problem-solving and logical thinking.",
    tags: ["Activities: Programming", "C Programming"],
  },
  // link: paste the Google Drive share link (Anyone with the link → Viewer)
  certs: [
    {
      t: "Python Programming and Prompt Engineering",
      s: "Jawan Pakistan",
      y: "Feb 2026 - Mar 2026",
      d: "Through this course I completed practical prompt engineering tasks, learning how to guide AI tools with clear prompts to generate images and videos. The course also covered Python programming, which I studied alongside these tasks.",
      link: "https://drive.google.com/file/d/1xqWkl_hLx11S1xoJin_tAw5mDkC-0RQZ/view",
    },
  ],
};

export const ND = "Not yet documented — to be added.";
export const SECTIONS = [
  "Problem Statement",
  "Dataset Overview",
  "Data Cleaning & Preprocessing",
  "Exploratory Data Analysis",
  "Methodology",
  "Model Selection",
  "Evaluation Metrics",
  "Key Findings",
  "Limitations & Future Improvements",
];

// repo / demo: add the real URLs. Empty repo falls back to your GitHub profile; empty demo hides the button.
export const PROJECTS = [
  {
    n: "01",
    t: "HeartCare AI",
    c: "Machine Learning | Healthcare Analytics",
    d: "An interactive heart disease prediction application built using machine learning. The project focuses on exploring health-related input features and evaluating model performance.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit"],
    repo: "https://github.com/Syed-Shayan-01/ML_PROJECTS/tree/main/HEART_DISEASE_PREDICT",
    demo: "https://heartdisease-ai.streamlit.app/",
    m: [
      ["Accuracy", "85.33%", 85.33],
      ["Precision", "90.82%", 90.82],
      ["Recall", "83.18%", 83.18],
      ["F1 Score", "86.83%", 86.83],
      ["ROC-AUC", "0.9232", 92.32],
    ],
    info: {
      "Problem Statement":
        "Build a machine learning model that estimates the probability of heart disease from 11 routine clinical inputs, and present the result in an interactive Streamlit app with a three-level risk output (lower, borderline, elevated).",
      "Dataset Overview":
        "918 patient records with 11 clinical features (Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope) and a binary HeartDisease target (508 positive, 410 negative). The data has no missing values and no duplicate rows.",
      "Data Cleaning & Preprocessing":
        "172 cholesterol values and 1 resting blood pressure value were recorded as 0, which is not physiologically valid, so they were replaced with the column median. Sex and exercise angina were encoded as binary columns, chest pain type, ST slope and resting ECG were one-hot encoded, and the numeric features (Age, RestingBP, Cholesterol, MaxHR, Oldpeak) were standardised with StandardScaler.",
      "Exploratory Data Analysis":
        "Histograms with density curves for the numeric features, count plots for the categorical features, box plots to inspect outliers, and a correlation heatmap.",
      Methodology:
        "80/20 train-test split (random_state 42). A K-Nearest Neighbors classifier was tuned with GridSearchCV (3-fold, scored on recall) over the number of neighbours, weighting and distance metric; the best setting was 7 neighbours, uniform weights and Manhattan distance. A 0.35 probability threshold is used instead of 0.5 to favour recall. The model, scaler and feature columns are saved with joblib and loaded by the Streamlit app.",
      "Model Selection":
        "K-Nearest Neighbors was tuned and used in the final app. The notebook also includes a comparison setup for Logistic Regression, Gaussian Naive Bayes, Decision Tree and SVC.",
      "Evaluation Metrics":
        "Accuracy 85.33% · Precision 90.82% · Recall 83.18% · F1 Score 86.83% · ROC-AUC 0.9232.",
      "Key Findings":
        "The app converts the model probability into three levels: lower risk (below 35%), borderline risk (35% to 60%) and elevated risk (60% and above).",
      "Limitations & Future Improvements":
        "An educational project, not a medical diagnostic tool. The dataset is small (918 records). Imputation and scaling were fitted on the full dataset before the train-test split, which can make test results slightly optimistic; a pipeline fitted on training data only, cross-validated comparison of more models, and external validation are the next improvements.",
    },
  },
  {
    n: "02",
    t: "Insurance Charges Prediction",
    c: "Regression | Predictive Analytics",
    d: "A machine learning regression project exploring how dataset features relate to medical insurance charges and using those features to predict insurance costs.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    repo: "",
    demo: "",
    type: "sc",
    info: {
      "Problem Statement":
        "Understand how dataset features relate to medical insurance charges and use them to predict insurance costs.",
      Methodology:
        "Regression modelling using Python, Pandas, NumPy, Matplotlib and Scikit-learn.",
    },
  },
  {
    n: "03",
    t: "ROI-Driven Customer Churn Prediction & Retention Optimization",
    c: "Machine Learning | Customer Analytics | Business Intelligence",
    d: "A customer churn analysis project using the IBM Telco Customer Churn dataset. The goal is to identify customers at risk of leaving and investigate whether targeted retention offers can generate positive financial returns.",
    tech: ["Python", "IBM Telco Dataset", "Churn Prediction", "ROI Analysis"],
    repo: "",
    demo: "",
    type: "pipe",
    wip: true,
    info: {
      "Problem Statement":
        "Identify customers at risk of leaving and investigate whether targeted retention offers can generate positive financial returns.",
      "Dataset Overview": "IBM Telco Customer Churn dataset.",
      Methodology:
        "Planned focus: customer churn analysis, data cleaning and preprocessing, exploratory data analysis, customer segmentation, churn prediction, retention strategy, and discount and ROI analysis.",
      "Key Findings":
        "This project is in progress; no results are reported yet.",
    },
  },
];

export const SKILLS = [
  [
    "Programming",
    "M8 7l-5 5 5 5m8-10l5 5-5 5",
    ["Python", "Java (Fundamentals)"],
  ],
  [
    "Data Manipulation",
    "M4 6h16M4 12h16M4 18h16",
    ["NumPy", "Pandas", "Data Cleaning", "Data Preprocessing"],
  ],
  [
    "Statistics & Analysis",
    "M4 20V10m6 10V4m6 16v-8",
    [
      "Descriptive Statistics",
      "Probability Fundamentals",
      "Z-Score",
      "Exploratory Data Analysis",
      "Statistical Foundations",
    ],
  ],
  [
    "Data Visualization",
    "M3 3v18h18M7 14l4-4 3 3 5-6",
    ["Matplotlib", "Seaborn", "Streamlit"],
  ],
  [
    "Machine Learning",
    "M12 3a4 4 0 00-4 4v1a4 4 0 000 8v1a4 4 0 008 0v-1a4 4 0 000-8V7a4 4 0 00-4-4z",
    [
      "Linear Regression",
      "Classification",
      "Model Evaluation",
      "Train-Test Split",
      "Performance Metrics",
    ],
  ],
];
export const TOOLS = ["Jupyter Notebook", "Google Colab", "Git", "GitHub"];
