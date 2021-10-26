/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
const { time, constants } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { setupAddresses, setupEnvironment, setupToken } = require('./utilsV3');

let adr;
let env;

describe('Lossless Environment', () => {
  beforeEach(async () => {
    adr = await setupAddresses();
    env = await setupEnvironment(adr.lssAdmin,
                                 adr.lssRecoveryAdmin,
                                 adr.lssPauseAdmin,
                                 adr.lssInitialHolder,
                                 adr.lssBackupAdmin,
                                );

  });

    describe('On deployment', () =>{ 
        describe('when the Lossless Controller contract has been set up', () =>{
            it('should set the stake amount correctly', async () => {
                expect(
                await env.lssController.getStakeAmount(),
                ).to.be.equal(env.stakeAmount);
            });

            it('should set the report lifetime correctly', async () => {
                expect(
                await env.lssController.getReportLifetime(),
                ).to.be.equal(Number(env.reportLifetime));
            });

            it('should set the report Lossless Token address correctly', async () => {
                expect(
                await env.lssController.losslessToken(),
                ).to.be.equal(lssToken.address);
            });

            it('should set the report Lossless Staking address correctly', async () => {
                expect(
                await env.lssController.losslessStaking(),
                ).to.be.equal(env.lssStaking.address);
            });

            it('should set the report Lossless Reporting address correctly', async () => {
                expect(
                await env.lssController.losslessReporting(),
                ).to.be.equal(env.lssReporting.address);
            });

            it('should set the report Lossless Governance address correctly', async () => {
                expect(
                await env.lssController.losslessGovernance(),
                ).to.be.equal(env.lssGovernance.address);
            });
        });

        describe('when the Lossless Staking Contract has been set up', () =>{
            it('should set the report Lossless Token address correctly', async () => {
                expect(
                await env.lssStaking.losslessToken(),
                ).to.be.equal(lssToken.address);
            }); 
        }); 

        describe('when the Lossless Reporting Contract has been set up', () =>{
            it('should set the report Lossless Token address correctly', async () => {
                expect(
                await env.lssReporting.losslessToken(),
                ).to.be.equal(lssToken.address);
            });

            it('should set the report Lossless Staking address correctly', async () => {
                expect(
                await env.lssReporting.losslessController(),
                ).to.be.equal(env.lssController.address);
            });

            it('should set the reporter reward correctly', async () => {
                expect(
                await env.lssReporting.reporterReward(),
                ).to.be.equal(2);
            });

            it('should set the Lossless fee correctly', async () => {
                expect(
                await env.lssReporting.losslessFee(),
                ).to.be.equal(10);
            });
        });
    });
});