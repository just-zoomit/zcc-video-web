import React from 'react';

const Navbar = () => (
  <section className="dorik-section dorik-section-l4mkm06p">
    <div className="container">
      <div className="dorik-row-5felaxg6 flex">
        <div className="col-lg-1/1">
          <div className="column-inner dorik-column-oi632mxj 1/1">
            <div className="dorik-navbar--wrapper dorik-nav-ynq9x73v-wrapper">
              <div className="dorik-navbar dorik-nav-ynq9x73v">
                <div className="dorik-navbar--brand">
                  <a href="/">
                    <img
                      src="https://cdn.dorik.com/5e373b6c43a72a001f56dbf6/images/dPay_pjbcb488.svg"
                      width="80px"
                      alt="Brand"
                    />
                  </a>
                </div>
                <button className="dorik-navbar--toggle" data-target="#dorikNavbarCollapse">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bars"
                    className="svg-inline--fa fa-bars fa-w-14 fa-fw"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                    />
                  </svg>
                </button>
                <div className="dorik-navbar--collapse collapse" id="dorikNavbarCollapse">
                  <div className="dorik-navbar--navs">
                    <ul className="dorik-nav--links normalize">
                      <li>
                        <a href="#features" className="dorik-nav--link features">
                          <span className="dorik-nav--link-text">Features</span>
                        </a>
                      </li>
                      <li>
                        <a href="#testimonials" className="dorik-nav--link testimonials">
                          <span className="dorik-nav--link-text">Testimonials</span>
                        </a>
                      </li>
                      <li>
                        <a href="#team" className="dorik-nav--link pricing">
                          <span className="dorik-nav--link-text">Pricing</span>
                        </a>
                      </li>
                    </ul>
                    <ul className="dorik-nav--btns normalize">
                      <li>
                        <a href="/contact-sales" className="dorik-nav--btn dorik-nav--btn-a9h97xdg contact-sales">
                          <span className="dorik-nav--btn-text">Get Connected</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Navbar;

