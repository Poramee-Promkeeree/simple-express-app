pipeline {
  agent any

  tools {
    nodejs 'Nodejs'            // ชื่อตรงกับที่คุณตั้งไว้
  }

  environment {
    SONARQUBE_SERVER = 'sonarqube'   // Server name ใน Jenkins
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
          echo "Node:" && node -v
          echo "NPM:" && npm -v
          npm ci || npm install
        '''
      }
    }

    stage('SonarQube Scan') {
      steps {
        script {
          // ใช้ Scanner จาก Global Tool Configuration
          def scannerHome = tool name: 'SonarQube Scanner',
                                 type: 'hudson.plugins.sonar.SonarRunnerInstallation'

          withSonarQubeEnv("${SONARQUBE_SERVER}") {
            // ถ้าใน repo มีไฟล์ sonar-project.properties อยู่แล้ว
            // สามารถเรียกเปล่า ๆ ได้เลยโดยไม่ต้องส่ง -D เพิ่ม
            sh """
              "${scannerHome}/bin/sonar-scanner" \
                -Dsonar.projectKey=SampleJenkinsApp \
                -Dsonar.projectName=SampleJenkinsApp \
                -Dsonar.sources=.
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 3, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
