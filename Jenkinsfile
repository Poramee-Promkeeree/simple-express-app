pipeline {
  agent any

  environment {
    SONARQUBE_SERVER = 'sonarqube'        // ชื่อ SonarQube server ใน Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Poramee-Promkeeree/simple-express-app.git'
      }
    }

    stage('Install') {
      steps {
        sh '''
          echo "Node version:" && node -v || true
          echo "NPM version:" && npm -v || true
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('SonarQube Scan') {
      steps {
        script {
          // เรียก SonarQube Scanner จาก Global Tool Configuration
          def scannerHome = tool name: 'SonarQube Scanner',
                                 type: 'hudson.plugins.sonar.SonarRunnerInstallation'

          withSonarQubeEnv("${SONARQUBE_SERVER}") {
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=SampleJenkinsApp \
                -Dsonar.projectName=SampleJenkinsApp \
                -Dsonar.sources=. \
                -Dsonar.branch.name=main
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
