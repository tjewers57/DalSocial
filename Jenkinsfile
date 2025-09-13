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
        stage ('Debug Checkout') {
            steps {
                echo 'Debugging...'
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -R | head -50'
            }
        }
        stage('Build') {
            steps {
                echo 'Compiling...'
                dir('DalSocial/backend/dalsocial') {
                    sh 'mvn -B -DskipTests clean package'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running Unit Tests...'
                dir('DalSocial/backend/dalsocial') {
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
                echo "Deploying..."
            }
        }
    }
}