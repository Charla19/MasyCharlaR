"""Build the French and English CVs from the original Word layout."""

from pathlib import Path

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "cv" / "template.docx"
BUILD = ROOT / "cv" / "generated"


FR = {
    1: "DÉVELOPPEUSE FULL-STACK",
    5: "Développeuse full-stack avec 4 ans d’expérience en développement et maintenance d’applications web. Je conçois des interfaces React, Next.js et TypeScript, des API en Node.js ou Python, ainsi que des flux de données fiables. J’interviens de l’intégration au déploiement et à la maintenance en production, notamment autour de Freshworks CRM et Freshdesk, au sein d’équipes pluridisciplinaires.",
    8: ("Développement full-stack :", " TypeScript, JavaScript, Next.js, React, Node.js, Python, FastAPI, Django, PHP, HTML, CSS"),
    9: ("API & données :", " API REST, Freshworks CRM, Freshdesk, MySQL, PostgreSQL, authentification, migrations et intégrité des données"),
    10: ("IA appliquée :", " interfaces pour l’entraînement de modèles, intégration de chatbots, préparation et structuration de données"),
    11: ("Production & qualité :", " Docker, Linux, Nginx, Git, Postman, Plesk, Azure, Google Cloud Platform, supervision"),
    14: ("Développeuse Web & CRM (TMA)", " | Humans4Help", " | avril 2024 à aujourd’hui"),
    17: "Migration de données utilisateurs au format JSON vers Freshworks CRM avec des scripts Python : nettoyage, mapping, import et contrôle de l’intégrité des données.",
    21: ("Technologies : ", "TypeScript, Next.js, Node.js, Python, FastAPI, React, Material UI, MySQL, Docker, Azure, Freshworks CRM, Freshdesk, Git"),
    22: ("Développeuse Web Full-Stack", " | Step Up Agence / Step Up Digital", " | mars 2023 à décembre 2023"),
    27: ("Développeuse Web & Data", " | TanIT Technologie", " | juin 2022 à novembre 2022"),
    34: "Licence en informatique, Intégration et Développement | ESTI, Madagascar | 2021 à 2024",
    35: "Google Cloud Associate Cloud Engineer | Certification obtenue en décembre 2024",
    40: "1re place | Hackathon DevFest 2023 : clean code et programmation compétitive",
    42: "1re place | Frontend Award 2023",
}


EN = {
    1: "FULL-STACK DEVELOPER",
    4: "PROFILE",
    5: "Full-stack developer with 4 years of experience building and maintaining web applications. I create interfaces with React, Next.js and TypeScript, APIs with Node.js or Python, and reliable data workflows. My work spans integration, deployment and production maintenance, including Freshworks CRM and Freshdesk, in multidisciplinary teams.",
    7: "CORE SKILLS",
    8: ("Full-stack development:", " TypeScript, JavaScript, Next.js, React, Node.js, Python, FastAPI, Django, PHP, HTML, CSS"),
    9: ("APIs & data:", " REST APIs, Freshworks CRM, Freshdesk, MySQL, PostgreSQL, authentication, migration and data integrity"),
    10: ("Applied AI:", " model-training interfaces, chatbot integration, data preparation and structuring"),
    11: ("Production & quality:", " Docker, Linux, Nginx, Git, Postman, Plesk, Azure, Google Cloud Platform, monitoring"),
    13: "PROFESSIONAL EXPERIENCE",
    14: ("Web & CRM Developer (Application Support)", " | Humans4Help", " | April 2024 to present"),
    15: "Technical management and ongoing maintenance of more than 20 websites and environments: troubleshooting, updates, security, performance, monitoring and migrations.",
    16: "Built and integrated full-stack business features, custom web components and automations to improve operational reliability.",
    17: "Migrated JSON user data to Freshworks CRM using Python scripts for cleaning, mapping, importing and integrity checks.",
    18: "Built a payroll application with React and FastAPI, and deployed it to an Azure virtual machine.",
    19: "Deployed and integrated a chatbot across the web estate using Docker, Nginx, a reverse proxy and website integration.",
    20: "Built a React and Material UI interface for an AI model-training app, covering upload, annotation, validation, training and results, with the data science team.",
    21: ("Technologies: ", "TypeScript, Next.js, Node.js, Python, FastAPI, React, Material UI, MySQL, Docker, Azure, Freshworks CRM, Freshdesk, Git"),
    22: ("Full-Stack Web Developer", " | Step Up Agence / Step Up Digital", " | March to December 2023"),
    23: "Built business modules, including a hotel booking module, with PHP, SQL and JavaScript.",
    24: "Implemented caching that reduced page load times by 50%.",
    25: "Led mobile-first redesigns and improved client website speed scores from 15% to over 90%.",
    26: ("Technologies: ", "PHP, SQL / MySQL, JavaScript, WordPress, SEO, Linux"),
    27: ("Web & Data Developer", " | TanIT Technologie", " | June to November 2022"),
    28: "Automated extraction and processing of data from more than 5,000 unstructured PDF documents.",
    29: "Structured and stored data in MySQL using Python and Node.js; cleaned and migrated Excel data.",
    30: "Built an internal API connecting the extraction engine to the database, with session management and authentication.",
    31: ("Technologies: ", "Python, Node.js, MySQL, SQL, REST APIs, JavaScript"),
    33: "EDUCATION & CERTIFICATION",
    34: "Bachelor’s degree in Computer Science, Integration and Development | ESTI, Madagascar | 2021 to 2024",
    35: "Google Cloud Associate Cloud Engineer | Certified in December 2024",
    36: "LANGUAGES",
    37: "French: professional bilingual proficiency | English: professional working proficiency",
    39: "AWARDS",
    40: "1st place | DevFest Hackathon 2023: clean code and competitive programming",
    41: "Awarded by Google Developer Group Antananarivo and AlgoMada",
    42: "1st place | Frontend Award 2023",
    43: "Awarded by TechZara",
}


def replace_paragraph(paragraph, value):
    parts = (value,) if isinstance(value, str) else value
    runs = paragraph.runs
    if len(parts) > len(runs):
        raise ValueError(f"Not enough styled runs for {paragraph.text!r}")
    for index, run in enumerate(runs):
        run.text = parts[index] if index < len(parts) else ""


def build(language, replacements):
    document = Document(TEMPLATE)
    for index, value in replacements.items():
        replace_paragraph(document.paragraphs[index], value)
    document.core_properties.title = f"MASY Charla Rosalie | CV ({language.upper()})"
    document.core_properties.author = "MASY Charla Rosalie"
    BUILD.mkdir(parents=True, exist_ok=True)
    output = BUILD / f"MASY-Charla-Rosalie-CV-{language}.docx"
    document.save(output)
    print(output)


if __name__ == "__main__":
    build("fr", FR)
    build("en", {**FR, **EN})
