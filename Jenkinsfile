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
                echo "Deploying..."
            }
        }
    }
}