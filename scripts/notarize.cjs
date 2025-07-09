/**
 * macOS 앱 공증(notarization) 스크립트
 *
 * electron-builder v24 이상에서 사용
 * 공식 문서: https://www.electron.build/configuration/configuration#AfterPackContext
 */

exports.default = async function (context) {
	const { electronPlatformName, appOutDir } = context;

	if (electronPlatformName !== 'darwin') {
		console.log('macOS 빌드가 아니므로 공증을 건너뜁니다');
		return;
	}

	// electron-builder가 자체적으로 notarize 설정을 처리할 수 있으나,
	// 추가적인 처리가 필요한 경우를 위한 스크립트입니다.
	console.log('afterSign 훅이 실행되었습니다');
	console.log('앱이 정상적으로 공증되도록 환경 변수를 확인하세요:');
	console.log('- APPLE_ID: Apple 개발자 계정 이메일');
	console.log('- APPLE_APP_SPECIFIC_PASSWORD: 앱 특정 비밀번호');
	console.log('- APPLE_TEAM_ID: Apple 개발자 팀 ID');

	// electron-builder v24부터는 notarize: true 설정으로 자동 공증이 가능합니다.
	// 만약 수동으로 공증 로직을 추가하고 싶다면 아래와 같이 사용할 수 있습니다:

	/*
  const { notarize } = require('@electron/notarize');

  // 환경 변수에서 인증 정보 가져오기
  const { APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, APPLE_TEAM_ID } = process.env;

  if (!APPLE_ID || !APPLE_APP_SPECIFIC_PASSWORD || !APPLE_TEAM_ID) {
    console.warn('공증에 필요한 환경 변수가 설정되지 않았습니다. 공증을 건너뜁니다.');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`공증 시작: ${appPath}`);

  try {
    await notarize({
      appPath,
      appBundleId: 'com.morib.client',
      appleId: APPLE_ID,
      appleIdPassword: APPLE_APP_SPECIFIC_PASSWORD,
      teamId: APPLE_TEAM_ID,
    });
    console.log('공증 완료');
  } catch (error) {
    console.error('공증 실패:', error);
    throw error;
  }
  */
};
