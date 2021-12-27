import styled from 'styled-components';
import HeadBoy from '@components/HeadBoy';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Range } from 'react-range';

// step 1 == loan ? loan amount -> name -> monthly income without taxes;
// step 2 === mortgage ? mortgage amount -> name -> monthly income without taxes;
// step 3 === credit ? credit score -> credit amount -> name;

type ServiceProps = 'loan' | 'mortgage' | 'credit';

function Homepage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceProps>('loan');
  const [error, setError] = useState('');

  const [loan, setLoan] = useState({
    amount: [500],
    name: '',
    income: 0.0,
  });

  const [mortgage, setMortgage] = useState({
    amount: [10000],
    name: '',
    income: 0.0,
  });

  const [credit, setCredit] = useState({
    score: 0,
    amount: 0.0,
    name: '',
  });

  const shouldMoveForward = () => {
    if (step === 2) {
      if (service === 'loan') {
        if (loan.amount[0] > 0) {
          return true;
        } else {
          setError('Please enter a loan amount');
          return false;
        }
      } else if (service === 'mortgage') {
        if (mortgage.amount[0] > 0) {
          return true;
        } else {
          setError('Please enter a mortgage amount');
          return false;
        }
      } else if (service === 'credit') {
        if (credit.score > 0) {
          return true;
        } else {
          setError('Please enter your credit score');
          return false;
        }
      }
    } else if (step === 3) {
      if (service === 'loan') {
        if (loan.name.length > 0) {
          return true;
        } else {
          setError('Please enter your name');
          return false;
        }
      } else if (service === 'mortgage') {
        if (mortgage.name.length > 0) {
          return true;
        } else {
          setError('Please enter your name');
          return false;
        }
      } else if (service === 'credit') {
        if (credit.amount > 0) {
          return true;
        } else {
          setError('Please enter your credit amount');
          return false;
        }
      }
    } else if (step === 4) {
      if (service === 'loan') {
        if (loan.income > 0) {
          return true;
        } else {
          setError('Please enter your monthly income without taxes');
          return false;
        }
      } else if (service === 'mortgage') {
        if (mortgage.income > 0) {
          return true;
        } else {
          setError('Please enter your monthly income without taxes');
          return false;
        }
      } else if (service === 'credit') {
        if (credit.name.length > 0) {
          return true;
        } else {
          setError('Please enter your name');
          return false;
        }
      }
    }

    return true;
  };

  return (
    <Wrapper>
      <HeadBoy title="Home" />
      <section className="wrapper-inner">
        <Card>
          <section className="card-inner">
            {step === 0 ? (
              <Introduction setStep={setStep} step={step} />
            ) : (
              <QuestionBox
                setStep={setStep}
                step={step}
                shouldMoveForward={shouldMoveForward}
                setError={setError}
              >
                {error && <ErrorBox>{error}</ErrorBox>}
                {step === 1 && (
                  <>
                    <QuestionTitle>
                      Which one of our services are you applying for?
                    </QuestionTitle>
                    <SelectBox
                      onChange={(e) =>
                        setService(e.target.value as ServiceProps)
                      }
                      value={service}
                    >
                      <option value="loan">Loan</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="credit">Credit</option>
                    </SelectBox>
                  </>
                )}

                {step === 2 && (
                  <>
                    {service === 'loan' ? (
                      <>
                        <QuestionTitle>Loan Amount</QuestionTitle>
                        <section
                          style={{ padding: '0 1rem', margin: '1rem 0' }}
                        >
                          <Range
                            step={50}
                            min={500}
                            max={20000}
                            values={loan.amount}
                            onChange={(values) =>
                              setLoan({ ...loan, amount: values })
                            }
                            renderThumb={({ props }) => (
                              <RenderThumb {...props} />
                            )}
                            renderTrack={({ props, children }) => (
                              <RenderTrack {...props}>{children}</RenderTrack>
                            )}
                          />
                        </section>
                      </>
                    ) : service === 'mortgage' ? (
                      <>
                        <QuestionTitle>Mortgage Amount</QuestionTitle>
                        <section
                          style={{ padding: '0 1rem', margin: '1rem 0' }}
                        >
                          <Range
                            step={1000}
                            min={10000}
                            max={20000}
                            values={mortgage.amount}
                            onChange={(values) =>
                              setMortgage({ ...mortgage, amount: values })
                            }
                            renderThumb={({ props }) => (
                              <RenderThumb {...props} />
                            )}
                            renderTrack={({ props, children }) => (
                              <RenderTrack {...props}>{children}</RenderTrack>
                            )}
                          />
                        </section>
                      </>
                    ) : service === 'credit' ? (
                      <>
                        <QuestionTitle>Credit Score</QuestionTitle>
                        <InputBox
                          type="number"
                          value={credit.score}
                          onChange={(e) =>
                            setCredit({
                              ...credit,
                              score: parseFloat(e.target.value),
                            })
                          }
                        />
                      </>
                    ) : null}
                  </>
                )}

                {step === 3 && (
                  <>
                    {service === 'loan' ? (
                      <>
                        <QuestionTitle>Name</QuestionTitle>
                        <InputBox
                          type="text"
                          value={loan.name}
                          onChange={(e) =>
                            setLoan({ ...loan, name: e.target.value })
                          }
                        />
                      </>
                    ) : service === 'mortgage' ? (
                      <>
                        <QuestionTitle>Name</QuestionTitle>
                        <InputBox
                          type="text"
                          value={mortgage.name}
                          onChange={(e) =>
                            setMortgage({ ...mortgage, name: e.target.value })
                          }
                        />
                      </>
                    ) : service === 'credit' ? (
                      <>
                        <QuestionTitle>Credit Amount</QuestionTitle>
                        <InputBox
                          type="number"
                          value={credit.amount}
                          onChange={(e) =>
                            setCredit({
                              ...credit,
                              amount: parseFloat(e.target.value),
                            })
                          }
                        />
                      </>
                    ) : null}
                  </>
                )}

                {step === 4 && (
                  <>
                    {service === 'loan' ? (
                      <>
                        <QuestionTitle>
                          Monthly Income without Taxes
                        </QuestionTitle>
                        <InputBox
                          type="number"
                          value={loan.income}
                          onChange={(e) =>
                            setLoan({
                              ...loan,
                              income: parseFloat(e.target.value),
                            })
                          }
                        />
                      </>
                    ) : service === 'mortgage' ? (
                      <>
                        <QuestionTitle>
                          Monthly Income without Taxes
                        </QuestionTitle>
                        <InputBox
                          type="number"
                          value={mortgage.income}
                          onChange={(e) =>
                            setMortgage({
                              ...mortgage,
                              income: parseFloat(e.target.value),
                            })
                          }
                        />
                      </>
                    ) : service === 'credit' ? (
                      <>
                        <QuestionTitle>Name</QuestionTitle>
                        <InputBox
                          type="text"
                          value={credit.name}
                          onChange={(e) =>
                            setCredit({
                              ...credit,
                              name: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : null}
                  </>
                )}

                {step === 5 && (
                  <Summary>
                    <HeadingSmall>{service}</HeadingSmall>
                    {service === 'loan' ? (
                      <>
                        <section className="summary-box">
                          <span>Loan Amount</span>
                          <span>{loan.amount}</span>
                        </section>
                        <section className="summary-box">
                          <span>Name</span>
                          <span>{loan.name}</span>
                        </section>
                        <section className="summary-box">
                          <span>Monthly Income without Taxes</span>
                          <span>{loan.income}</span>
                        </section>
                      </>
                    ) : service === 'mortgage' ? (
                      <>
                        <section className="summary-box">
                          <span>Mortgage Amount</span>
                          <span>{mortgage.amount}</span>
                        </section>
                        <section className="summary-box">
                          <span>Customer Name</span>
                          <span>{mortgage.name}</span>
                        </section>
                        <section className="summary-box">
                          <span>Monthly Income without Taxes</span>
                          <span>{mortgage.income}</span>
                        </section>
                      </>
                    ) : service === 'credit' ? (
                      <>
                        <section className="summary-box">
                          <span>Credit Score</span>
                          <span>{credit.score}</span>
                        </section>
                        <section className="summary-box">
                          <span>Credit Amount</span>
                          <span>{credit.amount}</span>
                        </section>
                        <section className="summary-box">
                          <span>Customer Name</span>
                          <span>{credit.name}</span>
                        </section>
                      </>
                    ) : null}
                  </Summary>
                )}
              </QuestionBox>
            )}
          </section>
        </Card>
      </section>
    </Wrapper>
  );
}

type IntroductionProps = {
  setStep: (step: number) => void;
  step: number;
};
const Introduction = ({ setStep, step }: IntroductionProps) => {
  return (
    <>
      <ImageBox>
        <Image src="/images/welcome.svg" width={300} height={200} />
      </ImageBox>
      <Button onClick={() => setStep(step + 1)}>Start</Button>
    </>
  );
};

type QuestionBoxProps = {
  children: React.ReactNode;
  setStep: (step: number) => void;
  step: number;
  shouldMoveForward: () => boolean;
  setError: (error: string) => void;
};

const QuestionBox = ({
  children,
  setStep,
  step,
  shouldMoveForward,
  setError,
}: QuestionBoxProps) => {
  return (
    <QuestionBoxWrapper>
      <Header step={step}>
        <span className="counter-display">{step > 1 ? <>&#10004;</> : 1}</span>
        <span className="line"></span>
        <span className="counter-display">{step > 2 ? <>&#10004;</> : 2}</span>
        <span className="line"></span>
        <span className="counter-display">{step > 3 ? <>&#10004;</> : 3}</span>
        <span className="line"></span>
        <span className="counter-display">{step > 4 ? <>&#10004;</> : 4}</span>
      </Header>
      <Body>{children}</Body>
      <Footer step={step}>
        {step > 0 && (
          <Button
            outline
            onClick={() => {
              setError('');
              setStep(step - 1);
            }}
          >
            Back
          </Button>
        )}
        {step <= 4 && (
          <Button
            onClick={() => {
              if (shouldMoveForward()) {
                setError('');
                setStep(step + 1);
              }
            }}
          >
            {step === 4 ? 'Submit' : 'Forward'}
          </Button>
        )}
      </Footer>
    </QuestionBoxWrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 1rem;

  .wrapper-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorBox = styled.section`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  font-size: 0.9rem;
`;

const Summary = styled.section`
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */

  .summary-box {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem 0;
    border-top: solid 1px ${({ theme }) => theme.colors.secondary};
  }
`;

const InputBox = styled.input`
  padding: 1rem 1.5rem;
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  outline: none;
`;

const HeadingSmall = styled.h5`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const QuestionBoxWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RenderThumb = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
`;

const RenderTrack = styled.section`
  height: 6px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
`;

const Header = styled.section<{ step: number }>`
  display: flex;
  padding: 1rem;
  justify-content: space-around;
  align-items: center;

  .counter-display {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.white};
  }

  .line {
    height: 1px;
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.section<{ step: number }>`
  display: flex;
  justify-content: ${({ step }) =>
    step === 5 ? 'flex-start' : 'space-between'};
  align-items: center;
`;

const SelectBox = styled.select`
  padding: 1rem 1.5rem;
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  outline: none;
`;

const QuestionTitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ImageBox = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeadingLarge = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const Button = styled.button<{ outline?: boolean }>`
  cursor: pointer;
  background: ${({ theme, outline }) =>
    outline ? 'transparent' : theme.colors.primary};
  color: ${({ theme, outline }) =>
    outline ? theme.colors.primary : theme.colors.white};
  border: solid 2px
    ${({ theme, outline }) => (outline ? theme.colors.primary : 'transparent')};
  border-radius: 4px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  min-width: 100px;

  &:hover {
    opacity: 0.75;
  }
`;

const Card = styled.section`
  width: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  .card-inner {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    ailgn-items: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 80%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export default Homepage;
