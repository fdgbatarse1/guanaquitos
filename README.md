# Guanaquitos: Empowering the future of El Salvador, one student at a time.

## Overview

**Guanaquitos** is a dynamic web platform designed to offer comprehensive vocational guidance and facilitate the search for careers and scholarships for high school students in the Antiguo Cuscatlán district of El Salvador.

Leveraging web technologies, open-source solutions, and artificial intelligence, Guanaquitos aims to become the go-to resource for Salvadoran students, providing them with crucial tools and information to shape their educational and professional futures.

The inspiration for Guanaquitos stemmed from a deep-seated desire to improve the future of El Salvador by enhancing its educational system. Cristina Ramirez, an orientation counselor, highlighted the absence of a centralized platform for Salvadoran students to find careers, scholarships, and receive personalized guidance. This project, initially conceived as a graduation project, has evolved into a personal mission to support Salvadoran youth.

## Key Features

- **Vocational Guidance Test:** A vocational guidance test based on the Holland typological theory. Holland's theory categorizes people into six personality types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional (RIASEC). By aligning these personality types with compatible career environments, the test provides personalized guidance for students, enabling them to pursue careers that best fit their inherent traits and preferences.
- **Search:** Allows students to search for resources, careers and scholarships.
- **Repositories:** Comprehensive repositories of scholarships, careers, and resources tailored to Salvadoran students.
- **Counselor Information:** Provides contact information for counselors to offer personalized guidance and support.
- **AI-Powered Chat:** Utilizes generative AI integrated with a vector database to assist students in finding relevant information and taking guidance tests.

## Architecture

Content managers, overseen by administrators, handle backend management through a content management system (Strapi) connected to a PostgreSQL database. This backend system allows for the efficient management of information related to counselors, careers, scholarships, and other essential resources. Updated information is embedded with the GPT-3.5-turbo model and indexed to Pinecone using the Langchain library. The user-friendly frontend displays this information across several pages, including a home page, careers page, scholarships page, guidance resources page, and an AI-powered chat interface.

## Installation

### Pre-requisites

- Git
- Docker

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/fdgbatarse1/guanaquitos
   ```

2. Obtain the necessary keys (if you want to collaborate with me, you can ask me for the API keys I use):

   - **Strapi Keys:** Generate keys for your Strapi application.
   - **PostgreSQL Database:** Set up the necessary credentials for the SQL database that will be initialized.
   - **AWS S3:** Create an AWS account, set up S3, and obtain your access keys, region, and bucket name.
   - **Google Maps API Key:** Sign up for Google Cloud Platform, enable the Maps API, and generate an API key.
   - **Pinecone:** Sign up for Pinecone, create an index, and obtain the API key, endpoint, and environment details.
   - **OpenAI:** Sign up for OpenAI and create an API key.
   - **Tavily:** Sign up for Tavily and obtain an API key.
   - **Langchain:** Sign up for Langchain and obtain the necessary keys and endpoint details.

3. Navigate to the backend folder, rename `.env.template` to `.env`, and fill it in with your credentials.

4. Navigate to the frontend folder, rename `.env.template` to `.env`, and fill it in with your credentials.

5. Run the following command:
   ```sh
   docker compose up
   ```

## Contributing

We welcome contributions! Please see our CONTRIBUTING.md for details on how to get started.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.

## Contact

For any inquiries or feedback, please contact us at guanaquitos.website@gmail.com.
