# Graph
It is a web development application built using AngularJS as a frontend framework and Node.Js as a backend framework using MySQL database.
- Some records of nodes and edges were inserted to the database, so once running the program, visualzing the graph.

![image](https://github.com/rowannasser/Graph/assets/101206117/5496f5ee-57cc-40a0-80dd-38a0fd423a95)
- Incase anyone want to add additional nodes and edges using the GUI, these nodes and edges will inserted in the database.

![image](https://github.com/rowannasser/Graph/assets/101206117/ce203c25-73ae-4c64-9996-e8d146804f05) ![image](https://github.com/rowannasser/Graph/assets/101206117/06d6ff71-388d-4675-9c6e-a838929c5575)


- Any updating in the position of the nodes will be updated in the database.

## How to Run The Application on Linux:

### 1. Clone the Repository

Clone the repository containing your web application to your Linux server:

```bash
git clone <repository_url>
cd <repository_directory>
```
### 2. Deploy Frontend (Angular)
Build the Angular application for production:
```bash
ng build --prod
```
Copy the generated files to the web server's document root directory:
```bash
cp -r dist/* /var/www/html
```
### 3. Deploy and Start Backend (Node.js) 
Navigate to the serv directory of the project and install dependencies:
```bash
cd serv
npm install
node server.js
```
### 4. Start Mongodb 
Write mongod in the terminal

