import '../static/style/components/advert.css'

const Advert = () => {
  return (
    <>
      <div className='ad-div comm-box'>
        <div>
          {/* <img
            src=''
            width='100%'
          /> */}
          {/* <!-- common -->  */}
          <ins
            className='adsbygoogle'
            style={{ display: 'block' }}
            data-ad-client='ca-pub-7775355478205656'
            data-ad-slot='7140510843'
            data-ad-format='auto'
            data-full-width-responsive='true'
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      </div>
    </>
  )
}

export default Advert
