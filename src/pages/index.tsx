import { getDefaultLayout, IDefaultLayoutPage } from "@/components/layout/default-layout";
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from "next/link";
import { useMemo } from "react";
export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
const IndexPage: IDefaultLayoutPage = () => {
  const bgImage1 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im1.jpg')"}), []);
  const bgImageInner1 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im1_m.jpg')"}), []);
  const bgImage2 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im2.jpg')"}), []);
  const bgImageInner2 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im2_m.jpg')"}), []);
  const bgImage3 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im3.jpg')"}), []);
  const bgImageInner3 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-vb_im3_m.jpg')"}), []);
  const zeroImageW1 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im1_w.jpg')"}), []);
  const zeroImageM1 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im1_m.jpg')"}), []);
  const zeroImageW2 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im2_w.jpg')"}), []);
  const zeroImageM2 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im2_m.jpg')"}), []);
  const zeroImageW3 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im3_w.jpg')"}), []);
  const zeroImageM3 = useMemo(() => ({backgroundImage: "url('/gentelella/build/images/centero-main-zero_im3_m.jpg')"}), []);
  const t = useTranslations('IndexPage');

  return (
    <>
      <div className="visual_wrap main-visual">
          <div className="main-vbSlider">
              <div className="slider-item">
                  <div className="bg" style={bgImage1}>
                      <div className="inner" style={bgImageInner1}>
                          <div className="text">
                              <div className="in">
                                  <p className="tit">{t('STC_C_0001.value')}</p>
                                  <p className="txt" dangerouslySetInnerHTML={{__html: t.raw('STC_C_0002.value')}}>
                                  </p>
                              </div>
                              <div className="btnArea"><Link href={"/AboutUS"} className="">Explore Centero</Link></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="slider-item">
                  <div className="bg"  style={bgImage2}>
                      <div className="inner" style={bgImageInner2}>
                          <div className="text">
                              <div className="in">
                                  <p className="tit">객관적이고 투명한<br />자발적 탄소 시장의 중심</p>
                                  <p className="txt">탄소 발자국을 줄이기 위해 신뢰할 수 있는 객관적이고 투명한 정보를 제공합니다.</p>
                              </div>
                              <div className="btnArea"><Link href={"/GHGProgram/KCS"} className="btn">Learn More</Link></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="slider-item">
                  <div className="bg" style={bgImage3}>
                      <div className="inner" style={bgImageInner3}>
                          <div className="text">
                              <div className="in">
                                  <p className="tit">사람과 지구를 위한<br />진정한 Net Zero 실현</p>
                                  <p className="txt">기후 변화에 맞서 지속 가능한 세상을 위해 자발적 탄소 감축의 선순환을 지원합니다.</p>
                              </div>
                              <div className="btnArea"><Link href={"/GHGProgram/KCS"} className="btn">Explore Centero</Link></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="section" id="main-section-about">
          <div className="inner">
              <div className="main-card">
                  <div className="thum"><Image src="/gentelella/build/images/centero-main-about_thum.jpg" alt=""  width={500} height={500}/></div>
                  <div className="text">
                      <p className="tit">Better NetZero, Better Life</p>
                      <p className="txt">
                          가장 효율적이고 최적의 탄소 감축이 가능하도록
                              Centero는 모두가 신뢰할 수 있는 서비스를 제공합니다.
                              탄소 감축 인증 프로세스 지원과 Credit 발급 및 거래 중개까지,
                              사람과 지구를 위한 NetZero를 실현합니다.
                      </p>
                      <div className="btnArea"><Link href="WhoWeAre" className="btn">Learn More<i className="fa fa-long-arrow-right"></i></Link></div>
                  </div>
              </div>

              <ul className="main-about-ul">
                  <li>
                      <div className="thum"><span className="ico i1"></span></div>
                      <div className="text">
                          <p className="tit"><strong>Efficient</strong> NetZero</p>
                          <p className="txt">탄소 거래를 위한 프로젝트 등록부터 인증, Credit 발행 및 거래에 이르는 원스톱 서비스</p>
                      </div>
                  </li>
                  <li>
                      <div className="thum"><span className="ico i2"></span></div>
                      <div className="text">
                          <p className="tit"><strong>Robust</strong> NetZero</p>
                          <p className="txt">
                              국내/외 주요 인증기관 및
                                  협회와의 협력으로
                                  정확하고 검증된 평가/인증
                          </p>
                      </div>
                  </li>
                  <li>
                      <div className="thum"><span className="ico i3"></span></div>
                      <div className="text">
                          <p className="tit"><strong>Credible</strong> NetZero</p>
                          <p className="txt">
                              자발적 탄소 거래에 참여하는
                                  모든 기업과 개인이
                                  서로 신뢰할 수 있는 투명한 환경
                          </p>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <div className="section-ban" id="main-section-msg">
          <div className="inner">
              지구를 위한 걸음을 내딛을 수록<br />
                  더 믿을 수 있는 탄소감축을 지원합니다.<br/>
                  지속 가능한 지구를 위한 여정에 함께 하세요.
          </div>
      </div>
      <div className="section" id="main-section-prog">
          <div className="inner">
              <div className="main-card">
                  <div className="thum"><Image src="/gentelella/build/images/centero-main-prog_thum.jpg" alt="" width={144}
      height={144}/></div>
                  <div className="text">
                      <p className="tit">신뢰할 수 있는 GHG Program</p>
                      <p className="txt">
                          검증된 Carbon Standard 기반의 프로세스 운영으로
                              탄소 감축 프로젝트 관련 모니터링 정보 및 데이터를
                              투명하게 공개합니다.
                      </p>
                      <div className="btnArea">
                          <Link href="GHGMain" className="btn">Learn More<i className="fa fa-long-arrow-right"></i></Link>
                          <Link href="Index" className="btn">Learn More<i className="fa fa-long-arrow-right"></i></Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="section" id="main-section-zero">
          <div className="inner">
              <p className="copy">NetZero와 관련된 다양한 정보와 최신 Trend를 지금 만나보세요</p>
              <div className="main-zeroSlider">
                  <a href="/AboutUs/Netzero?active=acco1'" className="slider-item">
                      <div className="bg" style={zeroImageW1}>
                          <div className="in" style={zeroImageM1}>Net Zero<br />왜 필요한가</div>
                      </div>
                  </a>
                  <a href="/AboutUs/Netzero?active=acco2" className="slider-item">
                      <div className="bg" style={zeroImageW2}>
                          <div className="in" style={zeroImageM2}>한국의<br/>NetZero 현황</div>
                      </div>
                  </a>
                  <a href="/AboutUs/Netzero?active=acco3" className="slider-item">
                      <div className="bg" style={zeroImageW3}>
                          <div className="in" style={zeroImageM3}>세계 각국의<br />NetZero 현황</div>
                      </div>
                  </a>
                  <a href="/AboutUs/Netzero?active=acco1" className="slider-item">
                      <div className="bg" style={zeroImageW1}>
                          <div className="in" style={zeroImageM1}>Net Zero<br />왜 필요한가</div>
                      </div>
                  </a>
                  <a href="/AboutUs/Netzero?active=acco2" className="slider-item">
                      <div className="bg" style={zeroImageW2}>
                          <div className="in" style={zeroImageM2}>한국의<br />NetZero 현황</div>
                      </div>
                  </a>
                  <a href="/AboutUs/Netzero?active=acco3" className="slider-item">
                      <div className="bg" style={zeroImageW3}>
                          <div className="in" style={zeroImageM3}>세계 각국의<br />NetZero 현황</div>
                      </div>
                  </a>
              </div>
          </div>
      </div>
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;

export default IndexPage;
