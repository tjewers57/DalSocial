pipeline {
    agent {
        node {
            label 'docker-agent-alpine'
        }
    }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Compiling...'
                dir('./backend/dalsocial') {
                    sh 'mvn -B -DskipTests clean package -ntp'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running Unit Tests...'
                dir('./backend/dalsocial') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Building Docker Image..."
                dir ('./backend/dalsocial') {
                    sh 'docker build -t travisj572/dalsocial-backend:v1.0.${BUILD_NUMBER} .'
                    echo "Pushing Docker Image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: 'docker-login', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                        sh 'docker push travisj572/dalsocial-backend:v1.0.${BUILD_NUMBER}'
                        sh 'docker logout'   
                    }
                }
            }
        }
    }
}